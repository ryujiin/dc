# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0004_pedido_numero_pedido'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='user',
            field=models.ForeignKey(related_name='Pedido', blank=True, to=settings.AUTH_USER_MODEL, null=True),
            preserve_default=True,
        ),
    ]
