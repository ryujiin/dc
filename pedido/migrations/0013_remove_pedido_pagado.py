# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0012_pedido_pagado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pedido',
            name='pagado',
        ),
    ]
