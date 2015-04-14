# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0006_auto_20150413_2226'),
    ]

    operations = [
        migrations.CreateModel(
            name='MetodoEnvio',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField(null=True, blank=True)),
                ('precio', models.DecimalField(max_digits=12, decimal_places=2)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='pedido',
            name='metodo_envio',
        ),
        migrations.AddField(
            model_name='pedido',
            name='metodoenvio',
            field=models.ForeignKey(blank=True, to='pedido.MetodoEnvio', null=True),
            preserve_default=True,
        ),
    ]
